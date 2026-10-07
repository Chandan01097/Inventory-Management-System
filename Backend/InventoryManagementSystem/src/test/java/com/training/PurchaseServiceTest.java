package com.training;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.Date;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.training.business.bean.PurchaseBean;
import com.training.dao.PurchaseDataAccess;
import com.training.service.PurchaseServiceImpl;

@ExtendWith(MockitoExtension.class)
public class PurchaseServiceTest {

    @Mock
    private PurchaseDataAccess purchaseDataAccess;

    @InjectMocks
    private PurchaseServiceImpl purchaseService;

    @Test
     void testAddPurchaseDetails() throws Exception {

        PurchaseBean bean = new PurchaseBean();

        bean.setVendorName("Only Vimal");
        bean.setMaterialCategoryId("C001");
        bean.setPurchaseDate(
                new Date(System.currentTimeMillis() - 24 * 60 * 60 * 1000)
        );

        when(purchaseDataAccess.savePurchaseDetail(any(PurchaseBean.class)))
                .thenAnswer(invocation -> {

                    PurchaseBean savedBean = invocation.getArgument(0);
                    savedBean.setPurchaseId(16);

                    return savedBean;
                });

        when(purchaseDataAccess.updateTransactionId(any(PurchaseBean.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        PurchaseBean result =
                purchaseService.addPurchaseDetails(bean);

        assertNotNull(result);
        assertNotNull(result.getTransactionId());

        assertTrue(result.getTransactionId().startsWith("P_"));
        assertTrue(result.getTransactionId().endsWith("_16"));

        assertEquals(
                "P_ONL_" +
                new java.text.SimpleDateFormat("MMddyyyy")
                        .format(bean.getPurchaseDate()) +
                "_C00_16",
                result.getTransactionId()
        );
    }

    @Test
     void testTransactionIdWithNullVendor() throws Exception {

        PurchaseBean bean = new PurchaseBean();

        bean.setVendorName(null);
        bean.setMaterialCategoryId("ELE");
        bean.setPurchaseDate(new Date());

        when(purchaseDataAccess.savePurchaseDetail(any(PurchaseBean.class)))
                .thenAnswer(invocation -> {

                    PurchaseBean savedBean = invocation.getArgument(0);
                    savedBean.setPurchaseId(20);

                    return savedBean;
                });

        when(purchaseDataAccess.updateTransactionId(any(PurchaseBean.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        PurchaseBean result =
                purchaseService.addPurchaseDetails(bean);

        assertNotNull(result);
        assertEquals(
                "NA",
                result.getTransactionId().split("_")[1]
        );
    }

    @Test
     void testTransactionIdWithShortValues() throws Exception {

        PurchaseBean bean = new PurchaseBean();

        bean.setVendorName("AB");
        bean.setMaterialCategoryId("X");
        bean.setPurchaseDate(new Date());

        when(purchaseDataAccess.savePurchaseDetail(any(PurchaseBean.class)))
                .thenAnswer(invocation -> {

                    PurchaseBean savedBean = invocation.getArgument(0);
                    savedBean.setPurchaseId(21);

                    return savedBean;
                });

        when(purchaseDataAccess.updateTransactionId(any(PurchaseBean.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        PurchaseBean result =
                purchaseService.addPurchaseDetails(bean);

        assertNotNull(result);
        assertNotNull(result.getTransactionId());

        assertTrue(result.getTransactionId().contains("_AB_"));
        assertTrue(result.getTransactionId().endsWith("_X_21"));
    }

    @Test
     void testTransactionIdRemovesSpacesAndUppercases() throws Exception {

        PurchaseBean bean = new PurchaseBean();

        bean.setVendorName(" a b c ");
        bean.setMaterialCategoryId(" e l e ");
        bean.setPurchaseDate(new Date());

        when(purchaseDataAccess.savePurchaseDetail(any(PurchaseBean.class)))
                .thenAnswer(invocation -> {

                    PurchaseBean savedBean = invocation.getArgument(0);
                    savedBean.setPurchaseId(22);

                    return savedBean;
                });

        when(purchaseDataAccess.updateTransactionId(any(PurchaseBean.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        PurchaseBean result =
                purchaseService.addPurchaseDetails(bean);

        assertNotNull(result);
        assertEquals(
                true,
                result.getTransactionId().contains("_ABC_")
        );

        assertTrue(
                result.getTransactionId().contains("_ELE_")
        );

        assertTrue(
                result.getTransactionId().endsWith("_22")
        );
    }
}