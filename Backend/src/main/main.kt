/**
 * Created by nikolaev on 17.08.16.
 */

import Controllers.*
import  spark.Spark.*
import java.io.File

public class Main {
    companion object {
        @JvmStatic public fun main(args: Array<String>) {
            port(8081)

            val maxThreads = Runtime.getRuntime().availableProcessors()
            threadPool(maxThreads)

            val uploadDir = File("upload")
            uploadDir.mkdir()

            get("api/auth") { req, res -> checkUserLoginStatus(req, res) }
            put("api/auth") { req, res -> AuthUser(req, res) }
            post("api/auth") { req, res -> AuthUser(req, res) }
            delete("api/auth") { req, res -> logout(req, res) }

            get("api/files") { req, res -> getUserFiles(req, res) }
            post("api/files") { req, res -> uploadUserFiles(req, res) }
            get("api/files/pagination") { req, res -> getPagination(req, res) }



            exception(Exception::class.java) { e, req, res -> e.printStackTrace() }
        }
    }
}