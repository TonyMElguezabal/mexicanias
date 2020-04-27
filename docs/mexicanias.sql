CREATE TABLE `Items` (
  `itemID` int,
  `desc` string,
  `img` string,
  `dateAdd` date,
  `active` bolean,
  `quantity` int,
  `supplierID` int,
  `cost` int,
  `price` int,
  `categoryID` int
);

CREATE TABLE `OrdersDetails` (
  `orderDetailID` int,
  `itemID` int,
  `orderID` int,
  `productQuantity` int
);

CREATE TABLE `Orders` (
  `orderID` int,
  `userID` int,
  `orderDate` date,
  `total` int,
  `discount` int,
  `statusID` int
);

CREATE TABLE `Status` (
  `statusID` int,
  `desc` string
);

CREATE TABLE `Categories` (
  `categoryID` int,
  `categoryName` string,
  `desc` string
);

CREATE TABLE `Users` (
  `userID` int,
  `name` string,
  `type` int,
  `email` string,
  `password` string,
  `joinDate` date,
  `rank` int
);

CREATE TABLE `Reviews` (
  `reviewID` int,
  `itemID` int,
  `desc` string,
  `starts` int,
  `userID` int
);

CREATE TABLE `Suppliers` (
  `supplierID` int,
  `name` string,
  `address` string,
  `cellphone` int,
  `active` bolean,
  `type` int
);

