package fu.sba301.pe02.service;

import fu.sba301.pe02.dto.IngredientRequest;
import fu.sba301.pe02.dto.IngredientResponse;
import fu.sba301.pe02.dto.PageDTO;
import fu.sba301.pe02.entity.Category;
import fu.sba301.pe02.entity.Ingredient;
import fu.sba301.pe02.repository.IngredientRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IngredientServiceImpl implements IngredientService {

    private final IngredientRepository ingredientRepository;

    @Override
    public PageDTO<IngredientResponse> getList(String name, Long categoryId, Pageable pageable) {
        return PageDTO.from(ingredientRepository.findByFilters(name, categoryId, pageable).map(this::toResponse));
    }

    @Override
    public IngredientResponse getById(Long id) {
        return toResponse(findOrThrow(id));
    }

    @Override
    public IngredientResponse create(IngredientRequest request) {
        if (ingredientRepository.existsByIngredientName(request.getIngredientName())) {
            throw new IllegalArgumentException("Ingredient name already exists: " + request.getIngredientName());
        }
        return toResponse(ingredientRepository.save(toEntity(new Ingredient(), request)));
    }

    @Override
    public IngredientResponse update(Long id, IngredientRequest request) {
        return toResponse(ingredientRepository.save(toEntity(findOrThrow(id), request)));
    }

    @Override
    public void delete(Long id) {
        findOrThrow(id);
        ingredientRepository.deleteById(id);
    }

    private Ingredient findOrThrow(Long id) {
        return ingredientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ingredient not found: " + id));
    }

    private Ingredient toEntity(Ingredient i, IngredientRequest req) {
        i.setIngredientName(req.getIngredientName());
        i.setPriceFrom(req.getPriceFrom());
        i.setPriceTo(req.getPriceTo());
        i.setProducerName(req.getProducerName());
        i.setEntryDate(req.getEntryDate());
        i.setSupplier(req.getSupplier());
        Category category = new Category();
        category.setCategoryId(req.getCategoryId());
        i.setCategory(category);
        return i;
    }

    private IngredientResponse toResponse(Ingredient i) {
        IngredientResponse res = new IngredientResponse();
        res.setIngredientId(i.getIngredientId());
        res.setIngredientName(i.getIngredientName());
        res.setPriceFrom(i.getPriceFrom());
        res.setPriceTo(i.getPriceTo());
        res.setProducerName(i.getProducerName());
        res.setEntryDate(i.getEntryDate());
        res.setSupplier(i.getSupplier());
        res.setCategoryId(i.getCategory().getCategoryId());
        res.setCategoryName(i.getCategory().getCategoryName());
        return res;
    }
}
