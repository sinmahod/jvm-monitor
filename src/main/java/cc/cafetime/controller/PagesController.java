package cc.cafetime.controller;

import cc.cafetime.util.PageUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;

/**
 * Created by liujing on 2017/2/12.
 */
@Controller
public class PagesController {

    @ResponseBody
    @RequestMapping("/index")
    public String index() {
        try {
            return PageUtil.readHtml("index");
        } catch (IOException e) {
            return "redirct:/error";
        }
    }

    @ResponseBody
    @RequestMapping("/login")
    public String login() {
        try {
            return PageUtil.readHtml("login");
        } catch (IOException e) {
            return "redirct:/error";
        }
    }
}