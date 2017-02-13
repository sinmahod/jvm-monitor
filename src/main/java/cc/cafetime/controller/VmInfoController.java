package cc.cafetime.controller;

import cc.cafetime.info.VmBasicInfo;
import cc.cafetime.info.VmMonitorInfo;
import cc.cafetime.info.VmThreadListInfo;
import com.jvmtop.monitor.JstatInfo;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

/**
 * Created by liujing on 2017/2/12.
 */
@Controller
public class VmInfoController {

    @ResponseBody
    @RequestMapping("/vm_basic_info/{id}")
    public String vmInfo(@PathVariable("id") int id) {
        Map<String, Object> map = VmBasicInfo.getInfo(id);
        return JSONObject.fromObject(map).toString();
    }

    @ResponseBody
    @RequestMapping("/vm_mon_info/{id}")
    public String vmMonitorInfo(@PathVariable("id") int id) {
        Map<String, Object> map = VmMonitorInfo.getInfo(id);
        JstatInfo jstatInfo = new JstatInfo(id);
        VmMonitorInfo.addHeapInfo(jstatInfo, map);
        return JSONObject.fromObject(map).toString();
    }

    @ResponseBody
    @RequestMapping("/vm_thread_list/{id}/{count}")
    public String vmThreadList(@PathVariable("id") int id, @PathVariable("count") int count) {
        VmThreadListInfo info = VmThreadListInfo.getInstance();
        return JSONArray.fromObject(info.getInfo(id, count)).toString();
    }

    @ResponseBody
    @RequestMapping("/vm_thread_count/{id}")
    public String vmThreadCount(@PathVariable("id") int id) {
        Map<String, Object> map = VmMonitorInfo.getThreadCount(id);
        return JSONObject.fromObject(map).toString();
    }
}
