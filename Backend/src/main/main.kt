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


            val uploadDir = File("upload")
            uploadDir.mkdir()

            get("api/auth", ::checkUserLoginStatus)
            put("api/auth", ::AuthUser)
            post("api/auth", ::AuthUser)
            delete("api/auth", ::logout)

            get("api/files", ::getUserFiles)
            post("api/files", ::uploadUserFiles)
            delete("api/files", ::deleteFile)

            get("api/files/pagination", ::getPagination)



            exception(Exception::class.java) { e, req, res -> e.printStackTrace() }
        }
    }
}