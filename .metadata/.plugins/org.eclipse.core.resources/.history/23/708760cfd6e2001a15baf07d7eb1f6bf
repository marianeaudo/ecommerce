package com.luv2code.ecommerce.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ProductCategory;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer{

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		
		HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.POST};
		
		//disable HTTP methods for Product: PUT, POST, DELETE
		
		config.getExposureConfiguration()
			.forDomainType(Product.class)
			.withItemExposure((metdata, HttpMethods) -> HttpMethods.disable(theUnsupportedActions))
			.withCollectionExposure((metdata, HttpMethods) -> HttpMethods.disable(theUnsupportedActions));
		
		//disable HTTP methods for ProductCategory: PUT, POST, DELETE
		
				config.getExposureConfiguration()
					.forDomainType(ProductCategory.class)
					.withItemExposure((metdata, HttpMethods) -> HttpMethods.disable(theUnsupportedActions))
					.withCollectionExposure((metdata, HttpMethods) -> HttpMethods.disable(theUnsupportedActions));
		
	}

	
	
}
