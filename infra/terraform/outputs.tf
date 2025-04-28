output "website_url" {
  description = "S3 Website URL"
  value       = aws_s3_bucket.frontend.website_endpoint
}

output "api_url" {
  description = "API Gateway URL"
  value       = aws_apigatewayv2_api.api.api_endpoint
}
