package com.training.test.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.training.dao.VendorDAO;
import com.training.entity.VendorEntity;

@SpringBootTest
public class VendorDAOTest {

	/*
	 * Autowire the VendorDAO object below
	 */
	@Autowired
	private VendorDAO vendorDAO;

	
	/*
	 * Method - notNullVendorDAOTest()
	 * Assert only that VendorDAO object is Not null
	 */
	
	@Test
	void notNullVendorDAOTest() {
		assertNotNull(vendorDAO);
	}

	/*
	 * Method - findByIdVendorDAOTest()
	 * Using VendorDAO fetch an entity by its ID --> "V001" 
	 * Assert that the entity fetch and it is Not null 
	 * Assert that the name of the vendor entity fetch is equal to --> "Only Vimal"
	 */

	@Test
	 void findByIdVendorDAOTest() {
		VendorEntity entity = vendorDAO.findById("V001").orElse(null);
		assertNotNull(entity);
		assertEquals("Only Vimal", entity.getVendorName());
	}
}
