import MobileNavigationBar from '../components/MobileNavigationBar'

function MobileCommunities() {

  const [signedIn, loading] = useAuthState(auth)

  useEffect(() => {
      if (!loading) {
      if (signedIn) {
          console.log("Logged In")
      } else {
          console.log("Logged Out")
      }
      }
  }, [signedIn, loading])

  return (
    <div className="MobileCommunities">

        <MobileNavigationBar />

    </div>
  );
}

export default MobileCommunities;