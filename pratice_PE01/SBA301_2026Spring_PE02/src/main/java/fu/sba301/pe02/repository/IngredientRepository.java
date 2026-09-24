package fu.sba301.pe02.repository;

import fu.sba301.pe02.entity.Ingredient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {

    @Query("SELECT i FROM Ingredient i WHERE " +
           "(:name IS NULL OR LOWER(i.ingredientName) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
           "(:categoryId IS NULL OR i.category.categoryId = :categoryId)")
    Page<Ingredient> findByFilters(@Param("name") String name,
                                   @Param("categoryId") Long categoryId,
                                   Pageable pageable);

    boolean existsByIngredientName(String ingredientName);
}
