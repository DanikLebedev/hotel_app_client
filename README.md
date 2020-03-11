
# Hotel app client
Client side of Hotel App which based on ReactJS, Typescript.
## Instalation
Cause this application was created by CRA, so just use 
```npm run start```.    
But if you want to launch client and server together:   
1. Clone https://github.com/DanikLebedev/Hotel_App_server and https://github.com/DanikLebedev/hotel_app_client in the same folder
2. Use ```cd <your folder>/Hotel_App_server``` 
3. Use 
```npm run dev```
(If your project doesn't running - use ```npm run build``` and after that  ```npm run dev```)
## Description
#### Full Responsive Hotel's website.

######Desktop version
![Desktop](https://vk.com/doc71186673_540330661?hash=2389450e3f3f1a1f70&dl=3ae943a5575c9b2d9b&wnd=1&module=im)

######Mobile version
![Mobile](https://vk.com/doc71186673_540332159?hash=0e0db227d5228d37f0&dl=4f82e69f7f713dddae&wnd=1&module=im)

Application has some types of users:
1. Customer
2. Admin
3. Manager(in development)

Customer can check room's list, find available room by date and category, make order, chat with manager, check articles, change his own information in personal account.
***
Admin can check all data in data grids, change,update or delete it.
***
About 98% of all components created via React Hooks.

Some examples of using react hooks:
```
//OrderPage.tsx
export const OrderPage: React.FC = () => {
    const context: ClientContext = useContext(ClientContext);
    const [userInfo, setUserInfo] = useState<Customer>({ email: '', lastName: '', name: '', order: [], password: '' });
...
```
To create base grid I used Bootstrap component: 
```
//HomePageAboutUs.tsx

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

 <Container fluid={true}>
                <Row>
                    <Col
                        lg={6}
                        sm={12}
                        md={6}
                        className={'d-flex justify-content-center align-items-center flex-column'}
                    >
                        <h2 className={'section__title home-page__about-us-title'}>{t('home-page-about.label')}</h2>
                        <p className={'home-page__about-us-text'}>{t('home-page-about.p1')}</p>
                        <p className={'home-page__about-us-text'}>{t('home-page-about.p2')}</p>
                        <NavLink to={'/about'}>
                            <button className={'button btn-black'}>{t('about.label')}</button>
                        </NavLink>
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={12}>
...
```
Also app use react-router-dom to navigate:
```

//routes.tsx
...
return (
        <Switch>
            <Route path="/admin/login" exact>
                <AuthAdminPage />
            </Route>
            <Route path="/" exact>
                <HomePage />
            </Route>
            <Route path="/rooms" exact>
                <RoomsPage />
            </Route>
            <Route path="/auth" exact>
                <AuthPage />
            </Route>
            <Route path="/about" exact>
                <AboutUsPage />
            </Route>
            <Route path="/rooms/:id">
                <RoomInfoPage />
            </Route>
            <Route path="/articles/:id">
                <ArticleInfoPage />
            </Route>
            <Route path="/articles">
                <ArticlesPage />
            </Route>
            <Route path="/auth/password/:token">
                <ResetPasswordPage />
            </Route>
            <Route component={NotFound} />
        </Switch>
    );
...
```
Full list of dependencies you can find in package.json.
##Find a bug?
Please send me an email to danik_lebedev1999@mail.ru with issue)
