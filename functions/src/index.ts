import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import algoliasearch from "algoliasearch";

admin.initializeApp();

const db = admin.firestore();
const storage = admin.storage();
const env = functions.config();
const bucket = storage.bucket("social-media-app-fcc1f.appspot.com");

const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex("post_search");

exports.indexPost = functions.firestore
    .document("users/{userId}/posts/{postId}")
    .onCreate(async (snap, context) => {
      const data = snap.data();
      const snapshot = await db.doc(`users/${context.params.name}`).get();
      const user = await snapshot.data();
      if (user === undefined) {
        return null;
      }
      data.user = {
        name: user.name,
        username: user.username,
        profileIcon: user.profileIcon,
      };
      const objectID = snap.id;

      return index.saveObject({
        objectID,
        ...data,
      });
    });

exports.unindexPost = functions.firestore
    .document("users/{userId}/posts/{postId}")
    .onDelete((snap, context) => {
      const objectID = snap.id;

      return index.deleteObject(objectID);
    });

const userIndex = client.initIndex("user_search");

exports.indexUser = functions.firestore
    .document("users/{userId}")
    .onCreate((snap, context) => {
      const data = snap.data();
      const objectID = snap.id;

      return userIndex.saveObject({
        objectID,
        ...data,
      });
    });

exports.unindexUser = functions.firestore
    .document("users/{userId}")
    .onDelete((snap, context) => {
      const objectID = snap.id;

      return userIndex.deleteObject(objectID);
    });

exports.deleteOldStories = functions.pubsub.schedule("every 1 hours")
    .onRun(async () => {
      const stories = await db.collectionGroup("stories").get();
      const jobs: Promise<any>[] = [];
      stories.forEach((snapshot) => {
        const story = snapshot.data();
        if (Date.now() - story.time > 86400000) {
          jobs.push(snapshot.ref.delete());
          const path = decodeURIComponent(story.image
              .split("o/")[1]
              .split("?")[0]);
          jobs.push(bucket.file(path).delete());
        }
      });
      return Promise.all(jobs);
    });
