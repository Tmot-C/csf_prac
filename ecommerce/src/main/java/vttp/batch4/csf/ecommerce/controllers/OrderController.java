package vttp.batch4.csf.ecommerce.controllers;


import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import vttp.batch4.csf.ecommerce.models.Order;
import vttp.batch4.csf.ecommerce.services.PurchaseOrderService;

@Controller
@RequestMapping(path="/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderController {

  @Autowired
  private PurchaseOrderService poSvc;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  @ResponseBody
  @PostMapping(path = "/order", consumes="application/json")
  public ResponseEntity<Object> postOrder(@RequestBody Order order) {
    // TODO Task 3
    System.out.println("test");
    poSvc.createNewPurchaseOrder(order);
    
	 Map<String, Object> response = new HashMap<>();
   response.put("response", order.getOrderId());
	 return ResponseEntity.ok().body(response);
  }
}
