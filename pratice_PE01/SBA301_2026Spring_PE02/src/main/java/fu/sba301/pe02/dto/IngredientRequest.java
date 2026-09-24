package fu.sba301.pe02.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;

@Data
public class IngredientRequest {

    @NotBlank(message = "Ingredient name is required")
    @Size(max = 100, message = "Ingredient name must not exceed 100 characters")
    private String ingredientName;

    @NotNull(message = "Price from is required")
    @Min(value = 1001, message = "Price from must be greater than 1000")
    private Float priceFrom;

    @NotNull(message = "Price to is required")
    @Min(value = 1001, message = "Price to must be greater than 1000")
    private Float priceTo;

    @Size(max = 100, message = "Producer name must not exceed 100 characters")
    private String producerName;

    @PastOrPresent(message = "Entry date must not be in the future")
    private LocalDate entryDate;

    @Size(max = 100, message = "Supplier must not exceed 100 characters")
    private String supplier;

    @NotNull(message = "Category ID is required")
    @Positive(message = "Category ID must be a positive number")
    private Long categoryId;

    @AssertTrue(message = "Price to must be greater than or equal to price from")
    private boolean isPriceRangeValid() {
        if (priceFrom == null || priceTo == null) return true;
        return priceTo >= priceFrom;
    }
}
