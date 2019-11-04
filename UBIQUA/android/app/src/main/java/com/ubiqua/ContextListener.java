package com.ubiqua;

public interface ContextListener {
    void onContextReady(String data);
    String getContextKey();
}