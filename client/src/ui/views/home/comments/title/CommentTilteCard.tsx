
interface IProps {
  title:string
}

function CommentTilteCard({title}:IProps):JSX.Element {
  return (
    <div className="w-[100%] mt-3 text-center text-3xl mb-3">
       Comments for {`"${title}"`}
    </div>
  )
}

export default CommentTilteCard