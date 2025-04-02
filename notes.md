# My thoughts while making the component

As it's Umbraco's default way of doing native web components, i decided to align with that approach and use Lit via the Open-WC generator.

First thought while making the component is accessibility and working with keyboard.

A problem i have is making the input take inputs when the select dropdown is open.

I should have researched a bit more beforehand.

I will build upon W3C's combobox with list autocomplete. As it already has the basics of what i need and being a believer of don't reinvent the wheel, i believe that this will save me alot of time. W3C's combobox pattern contains accessibility features and keyboard support.

Coming up on 6 hours work now.

The component is in a working state. Mouse and keyboard works, screen reader friendly, event emiting, and tests.

So i think i have done 6 out of 7 bonus points.

# What haven't been done

### Animations

Animations are generally considered a nice to have within a timeframe.
If i were to make some animations i would propably have made the list scroll in and out smoothly.

### Reusability

Currently, the component uses some hardcoded IDs and labels. To make the component reusable, these should be dynamically generated or passed in via properties.

### Click Outside to Close

The dropdown doesn't close when the user clicks outside the component. Implementing this would require adding a global event listener.

# What & why i prioritized

My first priorities was making the component accessible with ARIA and keyboard support.
In the beggining i was making the component with a input and a select on top of eachother.
This seemed like a great idea at first because the select tag includes native keyboard support, and would save me time.
I quickly found out that, that wont work.
I should have prioritised a bit more research before making the component.

# What i wish i had done differently

I wish i had done more research beforehand. I wasted around an hour on debugging some code that i didn't even use at the end.

# Final thoughts

Really great task. Made me think, learn, and explore new ways of coding. My prior experience with OOP, classes, and ARIA was quite limited, so tackling this task with Lit and focusing on accessibility was a significant and valuable learning experience.
