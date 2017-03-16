package com.brh.portal.sso.service.impl;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.brh.portal.sso.service.UploadService;

import spc.webos.service.BaseService;
import spc.webos.util.FileUtil;
import spc.webos.web.common.SUI;

@Service("ssoUploadService")
public class UploadServiceImpl extends BaseService implements UploadService {
	@Override
	public String alarm(String msg, String str, Map<String, String> map) {
		SUI sui = SUI.SUI.get();
		sui.setInPersist("xxx", "xxx");
		return "Alarm:" + msg + "::" + str + "::" + (map == null ? 0 : map.size());
	}

	@Override
	public String alarm(String msg) {
		return "Alarm:" + msg;
	}

	@Override
	public String upload(String dt) {
		SUI.SUI.get().upload().forEach((k, entries) -> {
			try {
				if (k.startsWith("file."))
					log.info("file: key:{} == {}", k, new String(FileUtil.file2bytes(entries.get(0).getTempFile())));
				else
					log.info("param: key:{} == {}", k, entries.get(0).getParameterValue());
			} catch (Exception e) {
				log.info("ex:", e);
			}
		});
		return "hello: " + dt;
	}
}
