# Integrations

In line with supporting Peter's omnichannel, we've setup certain integrations with our App to support various forms of communication. They are currently: Twilio, Email, Slack and through Zapier: FB Messenger, Typeform, and Trello (and again Slack). Also it should be noted that these integrations only work for checkin and not for Appointment creation, editing, or deletion. Beyond regular workflow integrations, we also monitor user interaction with Secretariat via Mouseflow.

## Twilio

Right now Twilio is hard-coded to use the one number from our trial account. This is a limitation of the twilio trial account, but when upgrading to a real account, it should be pretty simple to replace the hard-coded number with the number provided by the checkin form. Inheritors will however have to create their own Twilio account and link the relevant information accordingly. We do recommend creating some sort of `config` file moving forward for all these integrations so that other users can edit one file and have that propagate accordingly.

## Email

Right now we have an email account hosted by gmail: `kissmyapp2017@gmail.com`. Credentials will be provided below. Emails are sent from to the email account on checkin from itself to note that a user has checked in. Moving forward it would be good to have it also send users emails if they want email confirmation or reminders on checkin. That should involve scraping the users email, which right now the default checkin form doesn't require.

Email: `kissmyapp2017@gmail.com`
Pass: `ucsdkissmyapp2017`

## Slack

We support Slack natively with checkin. Upon user checkin, the designated Slack channel (right now set to `notifications`) is pinged alerting employees that the customer/user has arrived. Inheritors will once again have to create and configure their own slack account, changing the channel too if desired.

## Zapier

Zapier was probably the smartest move we were able to make. Zapier is an api for apis and thus if you can support/talk to Zapier, you can talk to anything else that can talk to Zapier. Currently Zapier supports over 750+ apps ranging from Typeform to Chatfuel (an AI bot for FB Messenger).

Currently, through Zapier, we have integrations set up with FB Messenger, Typeform, Trello, and Slack. To connect to our Zapier account, use the credentials below. For help on setting up Zapier integrations, check out our [guide](https://github.com/cse112-kissmyapp/EmissaryWST/blob/develop/developer_docs/Zapier%20Integration.md).

Email: `kissmyapp2017@gmail.com`
Pass: `ucsdkissmyap2017`

## Mouseflow

Mouseflow is a tool that monitors where users click and create heatmaps that correspond to user interactions with the application. This can be very useful for monitoring how users interact with the site and if there are any user interface or user experience issues that need to be addressed. This is done by a script embed in all html views.
