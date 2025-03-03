import React from 'react';
import Link from 'next/link';

const RefundPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Return & Refund Policy</h1>

      <div className="space-y-4 mb-8">
        <p>Our Return and Refund Policy was last updated on <strong>12/01/2025</strong>.</p>
        <p>Thank you for shopping at <strong>Viewus</strong>.</p>
        <p>The following terms are applicable for any products that you have purchased from us.</p>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Eligibility for Refunds</h2>
        <p className="mb-4">We offer refunds under the following circumstances:</p>
        <ul className="list-disc pl-8 space-y-2">
          <li>If the service is not delivered as promised due to an error on our end.</li>
          <li>If a technical issue caused by our platform prevents you from accessing the features you paid for, and the issue cannot be resolved within a reasonable timeframe.</li>
          <li>If you cancel your subscription within the refund period outlined below.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Refund Period</h2>
        <p>Refund requests must be made within <strong>1</strong> days of the payment date. Requests made after this period will not be eligible for a refund.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Non-Refundable Cases</h2>
        <p className="mb-4">Refunds will not be granted under the following conditions:</p>
        <ul className="list-disc pl-8 space-y-2">
          <li>If you change your mind after purchasing a subscription or service.</li>
          <li>If you fail to use the service during the subscription period.</li>
          <li>If the issue is caused by third-party software or tools not affiliated with our platform.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Refund Process</h2>
        <p className="mb-4">To request a refund, please follow these steps:</p>
        <ol className="list-decimal pl-8 space-y-2">
          <li>Contact our support team at <a href="mailto:team@viewus.in" className="text-blue-600 hover:underline">team@viewus.in</a>.</li>
          <li>Provide your payment receipt, order ID, and a detailed explanation of the issue.</li>
          <li>Our team will review your request and respond within 3-5 business days.</li>
          <li>If your request is approved, the refund will be processed to your original payment method within 7-10 business days.</li>
          <li>This has been generated by <Link href="https://dodopayments.com" className="text-blue-600 hover:underline">dodopayments.com</Link></li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p>If you have any questions about this Refund Policy or require assistance, please reach out to us:</p>
        <p>Email: <a href="mailto:team@viewus.in" className="text-blue-600 hover:underline">team@viewus.in</a></p>
      </section>
    </div>
  );
};

export default RefundPolicyPage;
