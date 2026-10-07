package com.training.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.training.business.bean.VendorBean;
import com.training.service.VendorService;

@RestController
public class VendorController {

    
    private VendorService vendorServiceImpl;
    
    public VendorController(VendorService vendorServiceImpl) {
        this.vendorServiceImpl = vendorServiceImpl;
    }

    @GetMapping("/vendor/controller/getVendors")
    public ResponseEntity<List<VendorBean>> getVendorDetails() {
        List<VendorBean> list = vendorServiceImpl.getVendorDetails();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/")
    public String index() {
        return "Welcome to Spring Boot Vendor Service API!";
    }
}
