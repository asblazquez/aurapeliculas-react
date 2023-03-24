import { API } from '../Constants'

export function TrailerComponent (props) {
  const { videos } = props
  return (
    <div className='centerVideo'>
        <iframe
        className='trailerVideo sombreado'
        src={API.youtube_render_video + videos.filter(x => x.type === 'Trailer')[0].key}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        title='Trailer'/>
    </div>
  )
}