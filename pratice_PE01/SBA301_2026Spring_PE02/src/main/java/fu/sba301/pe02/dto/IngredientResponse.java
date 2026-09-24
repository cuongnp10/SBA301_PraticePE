package fu.sba301.pe02.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class IngredientResponse {
    private Long ingredientId;
    private String ingredientName;
    private Float priceFrom;
    private Float priceTo;
    private String producerName;
    private LocalDate entryDate;
    private String supplier;
    private Long categoryId;
    private String categoryName;
}
