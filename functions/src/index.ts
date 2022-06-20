import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const env = functions.config();

import algoliasearch from "algoliasearch";

const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex("post_search");

exports.indexPost = functions.firestore
    .document("posts/{postId}")
    .onCreate((snap, context) => {
      const data = snap.data(); // Potentially Hide Some Data
      const objectID = snap.id;

      return index.saveObject({
        objectID,
        ...data,
      });
    });

exports.unindexPost = functions.firestore
    .document("posts/{postId}")
    .onDelete((snap, context) => {
      const objectID = snap.id;

      return index.deleteObject(objectID);
    });

const userIndex = client.initIndex("user_search");

exports.indexUser = functions.firestore
    .document("users/{userId}")
    .onCreate((snap, context) => {
      const data = snap.data(); // Potentially Hide Some Data
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
