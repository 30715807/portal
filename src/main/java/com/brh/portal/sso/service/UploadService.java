package com.brh.portal.sso.service;

import java.util.Map;

public interface UploadService {
	String upload(String dt);

	String alarm(String msg, String str, Map<String, String> map);
	
	String alarm(String msg);
}
