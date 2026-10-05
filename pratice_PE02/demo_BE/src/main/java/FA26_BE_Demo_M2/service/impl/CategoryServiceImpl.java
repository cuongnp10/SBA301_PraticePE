package FA26_BE_Demo_M2.service.impl;

import FA26_BE_Demo_M2.entity.Category;
import FA26_BE_Demo_M2.respository.CategoryRepository;
import FA26_BE_Demo_M2.service.CategoryService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}
