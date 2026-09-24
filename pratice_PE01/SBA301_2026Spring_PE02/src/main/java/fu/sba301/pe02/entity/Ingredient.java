package fu.sba301.pe02.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "Ingredients")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ingredient_id")
    private Long ingredientId; // Kiểu long, Identity

    @Column(name = "ingredient_name", length = 100, nullable = false, unique = true)
    private String ingredientName; // No duplicate

    @Min(value = 1001, message = "Price must be an integer greater than 1000")
    @Column(name = "price_from")
    private Float priceFrom;

    @Min(value = 1001, message = "Price must be an integer greater than 1000")
    @Column(name = "price_to")
    private Float priceTo;

    @Column(name = "producer_name", length = 100)
    private String producerName;

    @Column(name = "entry_date")
    private LocalDate entryDate; // Format dd/MM/yyyy

    @Column(name = "supplier", length = 100)
    private String supplier;

    // Quan hệ với bảng Category
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}