import ErrorPage from "../components/ErrorPage"

export default function Error401() {
    return(
       <div>
          <ErrorPage
          code={401}
          description={"The page that you're loking for ot found!"}
          image={"https://ik.imagekit.io/imado/web/wp-content/uploads/2024/02/401-Error.png"}
          />
       </div>
    )
   }