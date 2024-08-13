import React from 'react';

const TermsOfService = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
            
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p>
                    By accessing and using our service, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, you should not use this service. 
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Changes to Terms</h2>
                <p>
                    We reserve the right to modify these terms at any time. You should check this page regularly to ensure you are aware of any changes.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Use of Service</h2>
                <p>
                    You agree to use the service only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use of the service.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Account Responsibility</h2>
                <p>
                    You are responsible for maintaining the confidentiality of your account and password, and you agree to accept responsibility for all activities that occur under your account.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Termination</h2>
                <p>
                    We reserve the right to terminate or suspend your account and access to the service at our sole discretion, without notice or liability, for any reason, including if you breach these terms.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
                <p>
                    In no event shall we be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Governing Law</h2>
                <p>
                    These terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.
                </p>
            </section>
        </div>
    );
};

export default TermsOfService;
