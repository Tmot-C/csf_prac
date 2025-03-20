package vttp.batch4.csf.ecommerce.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import vttp.batch4.csf.ecommerce.models.LineItem;
import vttp.batch4.csf.ecommerce.models.Order;

@Repository
public class PurchaseOrderRepository {

  @Autowired
  private JdbcTemplate template;

  public static final String INSERT_ORDERS = """
    INSERT INTO orders (
    order_id, date, name, address, priority, comments) 
    VALUES (?, ?, ?, ?, ?, ?);
    """;

  public static final String INSERT_CARTS = """
    INSERT INTO carts (
    order_id, product_id, name, quantity, price) 
    VALUES (?, ?, ?, ?, ?);
    """;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  // You may only add Exception to the method's signature
  public void create(Order order) {
    // TODO Task 3
    template.update(INSERT_ORDERS, order.getOrderId(), order.getDate(), order.getName(), order.getAddress(),
        order.getPriority(), order.getComments());
    for (LineItem item : order.getCart().getLineItems()) {
      template.update(INSERT_CARTS, order.getOrderId(), item.getProdId(), item.getName(), item.getQuantity(),
          item.getPrice());
    }
  }
}
