import spark.Request
import spark.Response

fun registerUser(req: Request, res: Response): String {
    print(req.params())
    return "Hello: " + req.params(":name")
}