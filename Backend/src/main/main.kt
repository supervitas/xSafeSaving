/**
 * Created by nikolaev on 17.08.16.
 */
import  spark.Spark.*


fun main(args: Array<String>) {
    port(8081)

    post("/register") { req, res -> registerUser(req, res) }

}