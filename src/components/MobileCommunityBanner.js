import '../styles/MobileCommunityBanner.css'

function MobileCommunityBanner(props) {
  const { community } = props

  return (
    <>
        {
            community !== null && <>
                <img className='MobileCommunityBanner' src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1603999540542-b8c65c6d3e89%3Fcrop%3Dentropy%26cs%3Dtinysrgb%26fit%3Dmax%26fm%3Djpg%26ixid%3DMnwxMjA3fDB8MXxzZWFyY2h8MXx8bGFuZCUyMHBvbGx1dGlvbnx8MHx8fHwxNjI1NzMwOTU4%26ixlib%3Drb-1.2.1%26q%3D80%26w%3D1080&f=1&nofb=1" alt={community.name} />
                <div className='MobileCommunityBanner__Content'>
                    <p className='MobileCommunityBanner__Content__Name'>{community.name}</p>
                </div>
            </>
        }
    </>
  )
}

export default MobileCommunityBanner