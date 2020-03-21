## The API of what a Task should look like

```javascript
type task = {
  id: string,
  owner: string,
  created: Date,
  updated: Date,
  type: Store | Food | Apotechary | Company | Custom,
  location: string,
  helper?: User,
}
```

### Tasktypes

```javascript
type Store = {
  items: Array<string>,
}
```
```javascript
type Apotechary = {
  items: Array<string>,
  hasPrescription: boolean,
}
```
```javascript
type Food = {
  allergies: Array<string>,
  amountOfMeals: number,
  price: number,
  text: string,
}
```
```javascript
type Company = {
  typeOfCompany: 'phone' | 'chat' | 'visitor',
  detail: string,
}
```
```javascript
type Custom = {
  text: string, 
}
```
