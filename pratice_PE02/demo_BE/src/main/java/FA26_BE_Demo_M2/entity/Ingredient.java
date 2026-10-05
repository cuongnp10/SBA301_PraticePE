package FA26_BE_Demo_M2.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "ingredients")
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ingredient_id", nullable = false)
    private Long id;

    @Column(name = "entry_date")
    private LocalDate entryDate;

    @Size(max = 100)
    @NotNull
    @Column(name = "ingredient_name", nullable = false, length = 100)
    private String ingredientName;

    @Column(name = "price_from")
    private Float priceFrom;

    @Column(name = "price_to")
    private Float priceTo;

    @Size(max = 100)
    @Column(name = "producer_name", length = 100)
    private String producerName;

    @Size(max = 100)
    @Column(name = "supplier", length = 100)
    private String supplier;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

}