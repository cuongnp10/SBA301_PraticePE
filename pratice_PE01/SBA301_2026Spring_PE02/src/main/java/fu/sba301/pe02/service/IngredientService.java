package fu.sba301.pe02.service;

import fu.sba301.pe02.dto.IngredientRequest;
import fu.sba301.pe02.dto.IngredientResponse;
import fu.sba301.pe02.dto.PageDTO;
import org.springframework.data.domain.Pageable;

public interface IngredientService {
    PageDTO<IngredientResponse> getList(String name, Long categoryId, Pageable pageable);
    IngredientResponse getById(Long id);
    IngredientResponse create(IngredientRequest request);
    IngredientResponse update(Long id, IngredientRequest request);
    void delete(Long id);
}
