import static gcd.Main.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class GcdTest {

  @Test
  public void findsTheGcd() {
    assertEquals(3, gcd(9, 12), "gcd(9, 12) should be 3");
  }
}