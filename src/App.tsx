import { ChakraProvider } from "@chakra-ui/react";
import { ErrorComponent, ThemedLayoutV2, notificationProvider, RefineThemes } from "@refinedev/chakra-ui";
import { Refine } from "@refinedev/core";
import routerBindings, { NavigateToResource, UnsavedChangesNotifier } from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { ChakraUIInferencer } from "@refinedev/inferencer/chakra-ui";

const App = () => {
  return (
    <ChakraProvider theme={RefineThemes.Blue}>
      <BrowserRouter>
        <Refine
          notificationProvider={notificationProvider()}
          routerProvider={routerBindings}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          resources={[
            {
              name: "blog_posts",
              list: "/blog-posts",
              show: "/blog-posts/show/:id",
              create: "/blog-posts/create",
              edit: "/blog-posts/edit/:id",
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          <Routes>
            <Route
              element={
                <ThemedLayoutV2>
                  <Outlet />
                </ThemedLayoutV2>
              }
            >
              <Route index element={<NavigateToResource resource="blog_posts" />} />
              <Route path="blog-posts">
                <Route index element={<ChakraUIInferencer />} />
                <Route path="show/:id" element={<ChakraUIInferencer />} />
                <Route path="edit/:id" element={<ChakraUIInferencer />} />
                <Route path="create" element={<ChakraUIInferencer />} />
              </Route>
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
          <UnsavedChangesNotifier />
        </Refine>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;