package com.training.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.training.business.bean.PurchaseBean;
import com.training.entity.PurchaseEntity;

@Repository
public class PurchaseDataAccess {

	@Autowired
	private PurchaseDAO purchaseDAO;

	/**
	 * Saves purchase details into the purchase table.
	 *
	 * At this stage transactionId is not generated because
	 * purchaseId has not been generated yet.
	 */
	public PurchaseBean savePurchaseDetail(PurchaseBean purchaseBean) throws Exception {

		PurchaseEntity purchaseEntity = new PurchaseEntity();

		purchaseEntity.setVendorName(purchaseBean.getVendorName());
		purchaseEntity.setMaterialCategoryId(purchaseBean.getMaterialCategoryId());
		purchaseEntity.setMaterialTypeId(purchaseBean.getMaterialTypeId());
		purchaseEntity.setBrandName(purchaseBean.getBrandName());
		purchaseEntity.setUnitId(purchaseBean.getUnitId());
		purchaseEntity.setQuantity(purchaseBean.getQuantity());
		purchaseEntity.setPurchaseAmount(purchaseBean.getPurchaseAmount());
		purchaseEntity.setPurchaseDate(purchaseBean.getPurchaseDate());

		// Transaction ID is NOT set here.
		// It will be generated after the database creates purchaseId.

		purchaseEntity.setStatus("SUCCESS");

		// Save purchase.
		// Database generates purchaseId here.
		PurchaseEntity savedPurchaseEntity = purchaseDAO.save(purchaseEntity);

		// Convert saved entity to bean.
		PurchaseBean savedPurchaseBean = new PurchaseBean();

		savedPurchaseBean.setPurchaseId(savedPurchaseEntity.getPurchaseId());
		savedPurchaseBean.setTransactionId(savedPurchaseEntity.getTransactionId());
		savedPurchaseBean.setVendorName(savedPurchaseEntity.getVendorName());
		savedPurchaseBean.setMaterialCategoryId(savedPurchaseEntity.getMaterialCategoryId());
		savedPurchaseBean.setMaterialTypeId(savedPurchaseEntity.getMaterialTypeId());
		savedPurchaseBean.setBrandName(savedPurchaseEntity.getBrandName());
		savedPurchaseBean.setUnitId(savedPurchaseEntity.getUnitId());
		savedPurchaseBean.setQuantity(savedPurchaseEntity.getQuantity());
		savedPurchaseBean.setPurchaseAmount(savedPurchaseEntity.getPurchaseAmount());
		savedPurchaseBean.setPurchaseDate(savedPurchaseEntity.getPurchaseDate());
		savedPurchaseBean.setStatus(savedPurchaseEntity.getStatus());

		return savedPurchaseBean;
	}

	/**
	 * Updates the transaction ID after the purchase ID has been generated.
	 */
	public PurchaseBean updateTransactionId(PurchaseBean purchaseBean) throws Exception {

		// Find the purchase using the actual purchaseId.
		PurchaseEntity purchaseEntity = purchaseDAO.findById(purchaseBean.getPurchaseId())
				.orElseThrow(() -> new Exception("Purchase not found"));

		// Set the generated transaction ID.
		purchaseEntity.setTransactionId(purchaseBean.getTransactionId());

		// Update the purchase record.
		PurchaseEntity updatedPurchaseEntity = purchaseDAO.save(purchaseEntity);

		// Convert entity back to bean.
		PurchaseBean updatedPurchaseBean = new PurchaseBean();

		updatedPurchaseBean.setPurchaseId(updatedPurchaseEntity.getPurchaseId());
		updatedPurchaseBean.setTransactionId(updatedPurchaseEntity.getTransactionId());
		updatedPurchaseBean.setVendorName(updatedPurchaseEntity.getVendorName());
		updatedPurchaseBean.setMaterialCategoryId(updatedPurchaseEntity.getMaterialCategoryId());
		updatedPurchaseBean.setMaterialTypeId(updatedPurchaseEntity.getMaterialTypeId());
		updatedPurchaseBean.setBrandName(updatedPurchaseEntity.getBrandName());
		updatedPurchaseBean.setUnitId(updatedPurchaseEntity.getUnitId());
		updatedPurchaseBean.setQuantity(updatedPurchaseEntity.getQuantity());
		updatedPurchaseBean.setPurchaseAmount(updatedPurchaseEntity.getPurchaseAmount());
		updatedPurchaseBean.setPurchaseDate(updatedPurchaseEntity.getPurchaseDate());
		updatedPurchaseBean.setStatus(updatedPurchaseEntity.getStatus());

		return updatedPurchaseBean;
	}
}