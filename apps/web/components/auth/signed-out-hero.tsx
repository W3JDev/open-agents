"use client";

import { SignInButton } from "@/components/auth/sign-in-button";
import { AppMockup } from "@/components/landing/app-mockup";
import { GitHubLink } from "@/components/landing/github-link";
import { LandingBento } from "@/components/landing/bento";
import { LandingFeatures } from "@/components/landing/features";
import { LandingFooter } from "@/components/landing/footer";
import { LandingNav } from "@/components/landing/nav";
import { Stage } from "@/components/landing/stage";

export function SignedOutHero() {
  return (
    <div className="landing relative isolate min-h-screen bg-(--l-bg) text-(--l-fg) selection:bg-(--l-fg)/20">
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden md:block">
        <div className="mx-auto h-full max-w-[1320px] border-x border-x-(--l-border)" />
      </div>

      <div className="relative z-10">
        <LandingNav />

        <section className="relative overflow-hidden pb-0 pt-24 md:pb-0 md:pt-44">
          <div className="mx-auto max-w-[1320px] px-6">
            <div className="max-w-[740px]">
              <h1
                className="landing-fade-up text-4xl font-semibold leading-[1.03] tracking-tighter sm:text-5xl md:text-7xl"
                style={{ animationDelay: "30ms" }}
              >
                Open Agents.
              </h1>
              <p
                className="landing-fade-up mt-4 text-balance text-base leading-relaxed text-(--l-fg-2) sm:mt-6 sm:text-lg"
                style={{ animationDelay: "90ms" }}
              >
                Spawn coding agents that run infinitely in the cloud. Powered by
                AI SDK, Gateway, Sandbox, and Workflow SDK.
              </p>
            </div>

            <div
              className="landing-fade-up mt-6 flex items-center gap-4 sm:mt-8"
              style={{ animationDelay: "150ms" }}
            >
              <SignInButton className="rounded-md border-0 bg-(--l-btn-bg) px-5 text-[13px] font-medium text-(--l-btn-fg) transition-colors hover:bg-(--l-btn-hover)" size="lg" />
              <GitHubLink>Open Source</GitHubLink>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-[1320px] px-4 sm:px-6 md:mt-20 md:px-0">
            <div
              className="landing-fade-up"
              style={{ animationDelay: "240ms" }}
            >
              <Stage tone="slate">
                <div className="mx-auto w-full max-w-[1160px]">
                  <AppMockup />
                </div>
              </Stage>
            </div>
          </div>
        </section>

        <LandingFeatures />
        <LandingBento />
        <LandingFooter />
      </div>
    </div>
  );
}
