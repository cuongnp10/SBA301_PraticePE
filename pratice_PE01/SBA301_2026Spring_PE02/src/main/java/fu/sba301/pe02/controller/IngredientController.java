package fu.sba301.pe02.controller;

import fu.sba301.pe02.dto.IngredientRequest;
import fu.sba301.pe02.dto.IngredientResponse;
import fu.sba301.pe02.dto.PageDTO;
import fu.sba301.pe02.service.IngredientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ingredients")
@RequiredArgsConstructor
@Tag(name = "Ingredient", description = "APIs for managing ingredients")
@CrossOrigin("*")
public class IngredientController {

    private final IngredientService ingredientService;

    @GetMapping
    @Operation(summary = "Get list of ingredients", description = "Filter by name and/or category with pagination")
    @ApiResponse(responseCode = "200", description = "List retrieved successfully")
    public PageDTO<IngredientResponse> getList(
            @Parameter(description = "Filter by ingredient name (partial match)") @RequestParam(required = false) String name,
            @Parameter(description = "Filter by category ID") @RequestParam(required = false) Long categoryId,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort field") @RequestParam(defaultValue = "ingredientName") String sortBy) {
        return ingredientService.getList(name, categoryId, PageRequest.of(page, size, Sort.by(sortBy)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get ingredient by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Ingredient found"),
            @ApiResponse(responseCode = "404", description = "Ingredient not found")
    })
    public ResponseEntity<IngredientResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ingredientService.getById(id));
    }

    @PostMapping
    @Operation(summary = "Create a new ingredient")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Ingredient created"),
            @ApiResponse(responseCode = "400", description = "Invalid request body")
    })
    public ResponseEntity<IngredientResponse> create(@Valid @RequestBody IngredientRequest request) {
        try {
            return ResponseEntity.ok(ingredientService.create(request));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing ingredient")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Ingredient updated"),
            @ApiResponse(responseCode = "404", description = "Ingredient not found")
    })
    public ResponseEntity<IngredientResponse> update(@PathVariable Long id,
                                                     @Valid @RequestBody IngredientRequest request) {
        return ResponseEntity.ok(ingredientService.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete an ingredient")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Ingredient deleted"),
            @ApiResponse(responseCode = "404", description = "Ingredient not found")
    })
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        ingredientService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
