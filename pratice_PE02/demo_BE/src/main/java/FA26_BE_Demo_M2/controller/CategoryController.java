package FA26_BE_Demo_M2.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import FA26_BE_Demo_M2.entity.Category;
import FA26_BE_Demo_M2.service.CategoryService;

import java.util.List;


@RestController
@RequestMapping("/api/categories")
@Tag(
name = "Category Controller",
        description = "Controller for managing categories"
)
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

}
