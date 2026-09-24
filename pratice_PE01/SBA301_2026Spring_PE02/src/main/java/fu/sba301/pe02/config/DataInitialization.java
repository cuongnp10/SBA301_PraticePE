package fu.sba301.pe02.config;

import fu.sba301.pe02.entity.Category;
import fu.sba301.pe02.entity.Ingredient;
import fu.sba301.pe02.repository.CategoryRepository;
import fu.sba301.pe02.repository.IngredientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitialization implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final IngredientRepository ingredientRepository;

    @Override
    public void run(String... args) {
        seedCategories();
        seedIngredients();
    }

    private void seedCategories() {
        List<String> names = List.of(
                "Vegetables", "Fruits", "Meat", "Seafood",
                "Dairy", "Spices", "Grains", "Oils"
        );
        names.forEach(name -> {
            if (!categoryRepository.existsByCategoryName(name)) {
                categoryRepository.save(new Category(null, name));
            }
        });
    }

    private void seedIngredients() {
        List<Category> categories = categoryRepository.findAll();
        if (categories.isEmpty()) return;

        List<Object[]> data = List.of(
                new Object[]{"Carrot",        1200f,  3000f, "Farm Fresh Co.",   LocalDate.of(2024, 1, 10), "Green Farms",      "Vegetables"},
                new Object[]{"Salmon Fillet", 5000f, 12000f, "Ocean Harvest",    LocalDate.of(2024, 2, 15), "Sea Supply Co.",   "Seafood"},
                new Object[]{"Chicken Breast",3000f,  8000f, "Poultry Plus",     LocalDate.of(2024, 3, 5),  "Meat Masters",    "Meat"},
                new Object[]{"Mango",         1500f,  4000f, "Tropical Growers", LocalDate.of(2024, 1, 20), "Fruit World",     "Fruits"},
                new Object[]{"Cheddar Cheese",4000f,  9000f, "Dairy Delight",    LocalDate.of(2024, 2, 28), "Dairy Direct",    "Dairy"},
                new Object[]{"Black Pepper",  2000f,  5000f, "Spice Route",      LocalDate.of(2024, 3, 12), "Spice Traders",   "Spices"},
                new Object[]{"Jasmine Rice",  1100f,  2500f, "Rice Valley",      LocalDate.of(2024, 1, 30), "Grain Supply",    "Grains"},
                new Object[]{"Olive Oil",     3500f,  8500f, "Mediterranean Co.",LocalDate.of(2024, 2, 10), "Oil Imports",     "Oils"},
                new Object[]{"Broccoli",      1300f,  3200f, "Veggie Garden",    LocalDate.of(2024, 3, 18), "Green Farms",     "Vegetables"},
                new Object[]{"Shrimp",        4500f, 11000f, "Coastal Catch",    LocalDate.of(2024, 2, 22), "Sea Supply Co.",  "Seafood"}
        );

        data.forEach(row -> {
            String name = (String) row[0];
            if (ingredientRepository.existsByIngredientName(name)) return;

            String categoryName = (String) row[6];
            Category category = categories.stream()
                    .filter(c -> c.getCategoryName().equals(categoryName))
                    .findFirst().orElse(categories.get(0));

            Ingredient i = new Ingredient();
            i.setIngredientName(name);
            i.setPriceFrom((Float) row[1]);
            i.setPriceTo((Float) row[2]);
            i.setProducerName((String) row[3]);
            i.setEntryDate((LocalDate) row[4]);
            i.setSupplier((String) row[5]);
            i.setCategory(category);
            ingredientRepository.save(i);
        });
    }
}
