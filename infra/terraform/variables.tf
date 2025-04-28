variable "aws_region" {
  description = "AWS region to deploy resources in"
  default     = "us-east-1"
}

variable "website_bucket_name" {
  description = "Unique S3 bucket name for frontend hosting"
}

variable "lambda_function_name" {
  description = "Lambda function name"
  default     = "league-api-lambda"
}

variable "api_gateway_name" {
  description = "API Gateway name"
  default     = "league-api"
}
