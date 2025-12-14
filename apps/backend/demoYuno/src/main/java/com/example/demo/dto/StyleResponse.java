package com.example.demo.dto;

import java.util.Map;

public class StyleResponse {
    private String theme;
    private String primaryColor;
    private Map<String, String> customStyles;

    public StyleResponse(String theme, String primaryColor, Map<String, String> customStyles) {
        this.theme = theme;
        this.primaryColor = primaryColor;
        this.customStyles = customStyles;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public String getPrimaryColor() {
        return primaryColor;
    }

    public void setPrimaryColor(String primaryColor) {
        this.primaryColor = primaryColor;
    }

    public Map<String, String> getCustomStyles() {
        return customStyles;
    }

    public void setCustomStyles(Map<String, String> customStyles) {
        this.customStyles = customStyles;
    }
}
