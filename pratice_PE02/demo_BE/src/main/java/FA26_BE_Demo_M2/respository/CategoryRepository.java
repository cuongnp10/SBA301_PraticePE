package FA26_BE_Demo_M2.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import FA26_BE_Demo_M2.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {



}
