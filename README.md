# lambda_node_ses_email_forwarder_sendrawemail
* The goal for this project is to provide a backend for sending out e-mails (with an attachment) using Amazon SES, running on AWS Lambda + Node.JS
* This code only supports 50 recipients, a recipient is any to/cc/bcc address.
* If you do not need attachments checkout this version instead - [lambda sendemail ses](https://github.com/gellin/lambda_node_ses_email_forwarder_sendemail)

## Useage 
Input event data

* **to** / **cc** / **bcc** - You must use atleast one of these
* **subject** - The subject line
* **html** - The html version of the email body
* **text** - The text version of the email body
* **from** - Your verified sender address
* **attachments** - supports multiple in [mailcomposer](https://github.com/nodemailer/mailcomposer#attachments) format

```json
{
  "to": [
    "to-sample@example.com",
    "to-sample2@example.com"
  ],
  "bcc": [
    "bcc-sample@example.com",
    "bcc-sample2@example.com"
  ],
  "cc": [
    "cc-sample@example.com",
    "cc-sample2@example.com"
  ],
  "subject": "λ SES Node Test λλλ",
  "html": "<br><h1>Hello world!!!!!</h1> - from lambda",
  "text": "Hello world!!!!! - from lambda",
  "from": "YOUR_VERIFIED_SENDER_ADDRESS",
  "attachments": [
    {
      "filename": "test.jpg",
      "path": "http://www.example.com/sample.jpg"
    }
  ]
}
```

## Installation & Setup
1. Save the code to your computer, and extract it to a new folder
2. Initialize the node directory - install mailcomposer - **npm install mailcomposer**
3. Compress the index.js and node_modules folder into a zip file.
4. Create a new lambda function using Node.js runtime, upload the zip file as the source code, and create a new IAM access role with the following policy

```json
{  
   "Version":"2012-10-17",
   "Statement":[  
      {  
         "Effect":"Allow",
         "Action":[  
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents"
         ],
         "Resource":"arn:aws:logs:*:*:*"
      },
      {  
         "Effect":"Allow",
         "Action":[  
            "ses:SendRawEmail"
         ],
         "Resource":"*"
      }
   ]
}
```


## Credits
* Amazon AWS SDK for JavaScrtipt in Node.js
* mailcomposer - https://github.com/nodemailer/mailcomposer