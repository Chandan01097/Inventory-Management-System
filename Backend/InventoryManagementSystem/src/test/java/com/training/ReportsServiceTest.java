package com.training;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import java.util.Collections;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.training.business.bean.PurchaseBean;
import com.training.dao.ReportsDataAccess;
import com.training.service.ReportsServiceImpl;

@ExtendWith(MockitoExtension.class)
public class ReportsServiceTest {

    @Mock
    private ReportsDataAccess reportsDataAccess;

    @InjectMocks
    private ReportsServiceImpl reportsService;

    @Test
     void testGetVendorWisePurchaseDetails() {

        Date from = new Date();
        Date to = new Date();

        PurchaseBean purchaseBean = new PurchaseBean();
        purchaseBean.setVendorName("Only Vimal");

        List<PurchaseBean> expected =
                Collections.singletonList(purchaseBean);

        when(reportsDataAccess.getVendorWisePurchaseDetails(
                from,
                to,
                "Only Vimal"
        )).thenReturn(expected);

        List<PurchaseBean> result =
                reportsService.getVendorWisePurchaseDetails(
                        from,
                        to,
                        "Only Vimal"
                );

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Only Vimal", result.get(0).getVendorName());
    }
}