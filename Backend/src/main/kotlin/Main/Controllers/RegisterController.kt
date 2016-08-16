package Main.Controllers

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

/**
 * Created by nikolaev on 25.06.16.
 */

@RestController
class GreetingController {
    @RequestMapping("/register")
    fun greeting(@RequestParam(value = "name", defaultValue = "World") name: String): String {
        return ("Hello, $name")
    }
}