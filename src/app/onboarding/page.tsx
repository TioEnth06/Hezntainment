"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function OnboardingPage() {
  const router = useRouter();
  const [workspace, setWorkspace] = useState("Hezntainment Studio");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("SOSMED");

  return (
    <div className="min-h-screen bg-surface px-5 py-12">
      <div className="mx-auto max-w-lg">
        <Link href="/" className="font-display text-2xl font-semibold">
          Hezntainment
        </Link>
        <h1 className="mt-8 text-2xl font-semibold tracking-tight">Set up your workspace</h1>
        <p className="mt-2 text-sm text-muted">
          Admins create a workspace first, then invite Sosmed and Editor teammates.
        </p>

        <div className="mt-8 space-y-4 rounded-2xl border border-line bg-panel p-6">
          <div>
            <label className="text-sm font-medium">Workspace name</label>
            <input
              value={workspace}
              onChange={(e) => setWorkspace(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none ring-accent focus:ring-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Invite teammate (optional)</label>
            <div className="mt-1.5 flex gap-2">
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="sosmed@agency.com"
                className="flex-1 rounded-lg border border-line px-3 py-2.5 text-sm outline-none ring-accent focus:ring-2"
              />
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
                className="rounded-lg border border-line px-2 text-sm"
              >
                <option value="SOSMED">Sosmed</option>
                <option value="EDITOR">Editor</option>
              </select>
            </div>
          </div>
          <button
            type="button"
            onClick={() => router.push("/mna/dashboard")}
            className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white"
          >
            Enter workspace
          </button>
        </div>
      </div>
    </div>
  );
}
