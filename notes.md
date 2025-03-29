After reading the task instructions, i installed lit with the Open-wc generator.
As it's Umbraco's default way of doing native web components, i thought i would give it a shot with doing it the same way.

```sh
npm init @open-wc
```

First thought while making the component is accessibility & working with keyboard only. Searching for the best practice when making a select, is using label with a for="" or wrapping it.

A problem i have is making the input take inputs when the select dropdown is open.
