import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { Home } from "./pages/Home";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Welcome } from "./pages/Dashboard/Welcome";
import { DashboardProgress } from "./pages/Dashboard/DashboardProgress";
import { DashboardInsights } from "./pages/Dashboard/DashboardInsights";
import { DashboardBlockers } from "./pages/Dashboard/DashboardBlockers";
import { DashboardImpediments } from "./pages/Dashboard/DashboardImpediments";
import { DashboardRetrospective } from "./pages/Dashboard/DashboardRetrospective";
import { DashboardLayout } from "./layout/DashboardLayout";
import { Team } from "./pages/Dashboard/Team";
import { ProductArea } from "./pages/Dashboard/ProductArea";
import { ProductMembers } from "./pages/Product/ProductMembers";
import { Settings } from "./pages/Organization/Settings";
import { BillingOverview } from "./pages/Billing/BillingOverview";
import { UserLimits } from "./pages/Billing/UserLimits/UserLimits";
import { Preferences } from "./pages/Billing/Preferences";
import { UserRecords } from "./pages/Billing/UserLimits/UserRecords";
import { RequestIncrease } from "./pages/Billing/UserLimits/RequestIncrease";
import { History } from "./pages/Billing/History/History";
import { Invoice } from "./pages/Billing/History/Invoice";
import { PaymentDetails } from "./pages/Billing/History/PaymentDetails";
import { InvoiceDetails } from "./pages/Billing/History/InvoiceDetails";
import { Receipt } from "./pages/Billing/History/Receipt";
import { RequireAuth } from "./wrappers/RequireAuth";
import { ResetPassword } from "./pages/ResetPassword";
import { VerifyEmail } from "./pages/VerifyEmail";
import { ChangePassword } from "./pages/ChangePassword";
import { Progress } from "./pages/Features/Progress";
import { Blockers } from "./pages/Features/Blockers";
import { Impediments } from "./pages/Features/Impediments";
import { Insights } from "./pages/Features/Insights";
import { Designers } from "./pages/HowTeamsUse/Designers";
import { JoinProduct } from "./pages/Product/JoinProduct";
import { OrganizationMembers } from "./pages/Organization/OrganizationMembers";
import { About } from "./pages/About";
import { JoinTeam } from "./pages/Team/JoinTeam";
import { Pricing } from "./pages/Pricing";
import { OrganizationLayout } from "./layout/OrganizationLayout";
import { RequireRoles } from "./wrappers/RequireRoles";
import { Terms } from "./pages/Legal/Terms";
import { PrivacyPolicy } from "./pages/Legal/PrivacyPolicy";
import { Products } from "./pages/Features/Products";
import { Retrospective } from "./pages/Features/Retrospective";
import { Sentiment } from "./pages/Features/Sentiment";
import { JoinOrganization } from "./pages/Organization/JoinOrganization";
import { NotFound } from "./pages/NotFound";
import { TransferOwnership } from "./pages/Organization/TransferOwnership";
import { TransferProductOwnership } from "./pages/Product/TransferProductOwnership";
import { RequireProduct } from "./wrappers/RequireProduct";
import { RequireProductRoles } from "./wrappers/RequireProductRoles";
import { TransferTeamOwnership } from "./pages/Team/TransferTeamOwnership";
import { useSetEditingProduct } from "./hooks/useSetEditingProduct";
import { CustomerStories } from "./pages/CustomerStories";
import { Engineers } from "./pages/HowTeamsUse/Engineers";
import { ProductManagers } from "./pages/HowTeamsUse/ProductManagers";
import engineering from "./assets/home/engineering.png";
import product from "./assets/home/product.png";
import marketing from "./assets/home/marketing.png";
import { Checkout } from "./pages/Billing/Checkout";
import { Invoices } from "./pages/Billing/Invoices";
import { PaymentComplete } from "./pages/Billing/PaymentComplete";
import { CancelAccount } from "./pages/Billing/CancelAccount";
import { ProductVision } from "./pages/Dashboard/AboutProduct/ProductVision";
import { ProductDescription } from "./pages/Dashboard/AboutProduct/ProductDescription";
import { ProductNews } from "./pages/Dashboard/AboutProduct/ProductNews";
import { ValueProposition } from "./pages/Dashboard/AboutProduct/ValueProposition";
import { OKRs } from "./pages/Dashboard/AboutProduct/OKRs";
import { CustomerPersonas } from "./pages/Dashboard/AboutProduct/CustomerPersonas/CustomerPersonas";
import { MeetTeam } from "./pages/Dashboard/AboutProduct/MeetTeam";
import { CustomerPersona } from "./pages/Dashboard/AboutProduct/CustomerPersonas/CustomerPersona";
import { ProductRoadmap } from "./pages/Dashboard/AboutProduct/ProductRoadmap";
import { RejectProduct } from "./pages/Product/RejectProduct";
import { RejectTeam } from "./pages/Team/RejectTeam";
import { RejectOrganization } from "./pages/Organization/RejectOrganization";
import { TechStack } from "./pages/Dashboard/AboutProduct/TechStack";
import { CustomerFeedback } from "./pages/Dashboard/AboutProduct/CustomerFeedback";
import { TechNews } from "./pages/Dashboard/AboutProduct/TechNews";
import { TeamFeedback } from "./pages/Dashboard/AboutProduct/TeamFeedback";
import { ProductArtifacts } from "./pages/Dashboard/AboutProduct/ProductArtifacts";
import { DashboardSentiment } from "./pages/Dashboard/DashboardSentiment";
import { getMessaging, getToken } from "firebase/messaging";
import { sendRequest } from "./firebase";
import { useSelector } from "react-redux";

export const App = () => {


  useSetEditingProduct();
  React.useEffect(() => {
    sendRequest();
    const messaging = getMessaging();
    getToken(messaging, {
      vapidKey:
        "BIzB157FHKtJEWn5REl9tCa8h1QVIeclr4fGUqLNESFH9HbVri7Pzlhx8zY9YYTOk99rEL6ylp7TjiVfYjIAv7k",
    });
  }, []);

  const howTeamsUseTestimonials = [
    {
      title: "Engineering",
      icon: engineering,
      description: `Ship features faster by sharing and receiving progress, and collaborating on blockers and impediments with cross-teams &
more, all in one place.`,
    },
    {
      title: "Product",
      icon: product,
      description: `Get your product to market faster by
staying aligned to progress, resolving impediments, and unblocking your cross-
functional teams in Wallow.`,
    },
    {
      title: "Marketing",
      icon: marketing,
      description: `Keep your marketing team aligned to new feature progress.`,
    },
  ];

  return (
    <Routes>
      <Route exact path="/" element={<Layout />}>
        <Route path="*" element={<NotFound />} />
        <Route index element={<Home />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/customer-stories" element={<CustomerStories />} />

        <Route path="/features/progress" element={<Progress />} />
        <Route path="/features/blockers" element={<Blockers />} />
        <Route path="/features/impediments" element={<Impediments />} />
        <Route path="/features/insights" element={<Insights />} />
        <Route path="/features/products" element={<Products />} />
        <Route path="/features/retrospective" element={<Retrospective />} />
        <Route path="/features/sentiment" element={<Sentiment />} />

        <Route
          path="/designers"
          element={<Designers testimonials={howTeamsUseTestimonials} />}
        />
        <Route
          path="/engineers"
          element={<Engineers testimonials={howTeamsUseTestimonials} />}
        />
        <Route
          path="/product-managers"
          element={<ProductManagers testimonials={howTeamsUseTestimonials} />}
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/verify-email/:key" element={<VerifyEmail />} />
        <Route
          path="/change-password/:uid/:token"
          element={<ChangePassword />}
        />
      </Route>

      <Route element={<RequireAuth />}>
        <Route path="/products/join/:id/:name" element={<JoinProduct />} />
        <Route path="/products/reject/:id/:name" element={<RejectProduct />} />
        <Route path="/teams/join/:id/:name" element={<JoinTeam />} />
        <Route path="/teams/reject/:id/:name" element={<RejectTeam />} />
        <Route
          path="/organization/join/:id/:name"
          element={<JoinOrganization />}
        />
        <Route
          path="/organization/reject/:id/:name"
          element={<RejectOrganization />}
        />

        <Route
          exact
          path="/dashboard"
          element={<RequireProduct outlet={<DashboardLayout />} />}
        >
          <Route index element={<Welcome />} />

          <Route path="/dashboard/progress" element={<DashboardProgress />} />
          <Route path="/dashboard/insights" element={<DashboardInsights />} />
          <Route path="/dashboard/blockers" element={<DashboardBlockers />} />
          <Route
            path="/dashboard/impediments"
            element={<DashboardImpediments />}
          />
          <Route
            path="/dashboard/retrospective"
            element={<DashboardRetrospective />}
          />
          <Route path="/dashboard/sentiment" element={<DashboardSentiment />} />

          <Route path="/dashboard/teams/:id" element={<Team />} />
          <Route
            path="/dashboard/teams/:id/transfer-ownership"
            element={<TransferTeamOwnership />}
          />

          <Route
            path="/dashboard/product-areas/:id"
            element={<ProductArea />}
          />

          <Route path="/dashboard/product-vision" element={<ProductVision />} />

          <Route
            path="/dashboard/product-description"
            element={<ProductDescription />}
          />

          <Route path="/dashboard/product-news" element={<ProductNews />} />

          <Route
            path="/dashboard/product-artifacts"
            element={<ProductArtifacts />}
          />
          <Route
            path="/dashboard/value-proposition"
            element={<ValueProposition />}
          />
          <Route path="/dashboard/okrs" element={<OKRs />} />
          <Route path="/dashboard/meet-the-team" element={<MeetTeam />} />
          <Route
            path="/dashboard/customer-personas"
            element={<CustomerPersonas />}
          />
          <Route
            path="/dashboard/customer-personas/:id"
            element={<CustomerPersona />}
          />
          <Route
            path="/dashboard/product-roadmap"
            element={<ProductRoadmap />}
          />

          <Route path="/dashboard/tech-stack" element={<TechStack />} />

          <Route path="/dashboard/tech-news" element={<TechNews />} />

          <Route
            path="/dashboard/customer-feedback"
            element={<CustomerFeedback />}
          />
          <Route path="/dashboard/team-feedback" element={<TeamFeedback />} />
          <Route
            path="/dashboard/members"
            element={
              <RequireProductRoles
                outlet={<ProductMembers />}
                allowedRoles={[
                  "Primary Organization Owner",
                  "Organization Owner",
                  "Product Owner",
                  "Primary Product Owner",
                ]}
              />
            }
          />

          <Route
            path="/dashboard/transfer-ownership"
            element={<TransferProductOwnership />}
          />
        </Route>

        <Route
          exact
          path="organization"
          element={
            <RequireRoles
              outlet={<OrganizationLayout />}
              allowedRoles={[
                "Primary Organization Owner",
                "Organization Owner",
              ]}
            />
          }
        >
          <Route path="settings" element={<Settings />} />
          <Route path="members" element={<OrganizationMembers />} />
          <Route path="transfer-ownership" element={<TransferOwnership />} />
        </Route>

        <Route
          exact
          path="/billing"
          element={
            <RequireRoles
              outlet={<OrganizationLayout />}
              allowedRoles={[
                "Primary Organization Owner",
                "Organization Owner",
              ]}
            >
              <OrganizationLayout />
            </RequireRoles>
          }
        >
          <Route
            path="/billing/cancel-account"
            element={
              <RequireRoles
                outlet={<CancelAccount />}
                allowedRoles={[
                  "Primary Organization Owner",
                  // "Organization Owner",
                ]}
              />
            }
          />
          <Route path="/billing/overview" element={<BillingOverview />} />
          {/* <Route
                        path="/billing/payment-methods"
                        element={<PaymentMethods />}
                    />
                    <Route
                        path="/billing/payment-methods/:id"
                        element={<PaymentMethod />}
                    />
                    <Route
                        path="/billing/payment-methods/add"
                        element={<AddPaymentMethod />}
                    /> */}
          <Route path="/billing/user-limits" element={<UserLimits />} />
          <Route
            path="/billing/user-limits/user-records"
            element={<UserRecords />}
          />
          <Route
            path="/billing/user-limits/request-increase"
            element={<RequestIncrease />}
          />
          <Route path="/billing/user-limits" element={<UserLimits />} />
          <Route path="/billing/preferences" element={<Preferences />} />
          <Route path="/billing/history" element={<History />} />
          <Route path="/billing/invoices" element={<Invoices />} />
          <Route path="/billing/history/invoices/:id" element={<Invoice />} />
          <Route
            path="/billing/history/invoices/:id/payment-details"
            element={<PaymentDetails />}
          />
          <Route
            path="/billing/history/invoices/:id/invoice-details"
            element={<InvoiceDetails />}
          />
          <Route
            path="/billing/history/invoices/:id/receipt"
            element={<Receipt />}
          />

          <Route path="/billing/checkout/:invoiceId" element={<Checkout />} />
          <Route
            path="/billing/checkout/:invoiceId/complete"
            element={<PaymentComplete />}
          />
        </Route>
      </Route>
    </Routes>
  );
};
