package Main.Database.Executor

import Main.Database.TResultHandler.TResultHandler
import java.sql.Connection
import java.sql.SQLException
import java.sql.ResultSet
import java.sql.Statement

/**
 * Created by nikolaev on 21.06.16.
 */


//object TExecutor {
//    @Throws(SQLException::class)
//    fun <T> execQuery(connection: Connection, query: String, handler: TResultHandler<T>): T {
//        var value: T
//        connection.createStatement().use {
//            stmt ->
//            stmt.execute(query)
//            stmt.getResultSet().use({ result -> value = handler.handle(result) })
//        }
//
//        return value
//    }
//
//    @Throws(SQLException::class)
//    fun execQuery(connection: Connection, query: String) {
//        connection.createStatement().use { stmt -> stmt.execute(query) }
//    }
//}
